//Post.tsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
    Container,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Box,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import { usePostStore } from "../hooks/usePostStore";
import type { PostInterface } from "../models/Post";

export default function PostsTable() {

    const { iduser } = useParams();
    const {
        posts,
        startLoadingPosts,
        startSavingPost,
        startDeletingPost,
    } = usePostStore();

    const navigate = useNavigate();

    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState<PostInterface>({ title: "", body: "" });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        if (!iduser) {
            return;
        }

        const id = Number(iduser);
        if (Number.isNaN(id)) {
            return;
        }

        await startLoadingPosts(id);
    };

    const openNew = () => {
        setForm({ title: "", body: "", userId: iduser ? Number(iduser) : undefined });
        setFormOpen(true);
    };

    const openEdit = (post: PostInterface) => {
        const uid = post.userId ?? (iduser ? Number(iduser) : undefined);
        setForm({ ...post, userId: uid });
        setFormOpen(true);
    };

    const closeForm = () => {
        setForm({ title: "", body: "" });
        setFormOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSave = async () => {
        const postToSave: PostInterface = { ...form } as PostInterface;
        if (!postToSave.userId && iduser) postToSave.userId = Number(iduser);

        await startSavingPost({ id: form.id, post: postToSave });

        if (iduser) await startLoadingPosts(Number(iduser));
        closeForm();
    };

    const handleDelete = async (post: PostInterface) => {
       
        const ok = window.confirm(`¿Desea eliminar el post "${post.title}"?`);
        if (!ok) return;
        if (post.id == null) {
            console.warn("id:", post);
            return;
        }
        await startDeletingPost(post.id);
        if (iduser) await startLoadingPosts(Number(iduser));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Lista de Posts
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                    Regresar
                </Button>
                <Button variant="contained" color="primary" onClick={fetchPosts}>
                    Consultar
                </Button>
                <Button variant="outlined" color="primary" onClick={openNew}>
                    Nuevo post
                </Button>
            </Stack>

            <Dialog open={formOpen} onClose={closeForm} fullWidth maxWidth="sm">
                <DialogTitle>{form.id ? "Editar Post" : "Crear Post"}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            label="Título"
                            fullWidth
                            name="title"
                            value={form.title ? form.title : ''}
                            onChange={handleChange}
                            
                        />
                        <TextField
                            margin="normal"
                            label="Cuerpo"
                            fullWidth
                            multiline
                            minRows={3}
                            name="body"
                            value={form.body ? form.body : ''}
                            onChange={handleChange}
                        
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeForm}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {posts && posts.length > 0 ? (
                <Table sx={{ mt: 3 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Cuerpo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post: any, index: number) => (
                            <TableRow key={post.id ?? index}>
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.body}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <Button size="small" variant="outlined" onClick={() => openEdit(post)}>
                                            Editar
                                        </Button>
                                        <Button size="small" color="error" variant="contained" onClick={() => handleDelete(post)}>
                                            Eliminar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            component={Link}
                                            to={`/postsSingle/${post.id}`}
                                        >
                                            Ver
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Typography sx={{ mt: 2 }}>No hay posts para mostrar.</Typography>
            )}
        </Container>
    );
}