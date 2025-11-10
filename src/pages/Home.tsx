//Home.tsx
import { useEffect, useState } from "react";
import type { UserInterface } from "../models";
import { useNavigate } from 'react-router-dom';

import {
    Typography,
    Container,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,

} from '@mui/material';


import { useUserStore } from '../hooks/useUserStore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Home() {

    const {
        users,
        isLoading,
        isLocked,
        disabledUser,
        startLoadingUsers,
        startSavingUser,
        startDeletingUser,
        setUser,
    } = useUserStore();
    const navigate = useNavigate();

    const [openForm, setOpenForm] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [formUser, setFormUser] = useState<UserInterface>({ name: "" });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        startLoadingUsers();
    }, []);

    const handleOpenCreate = () => {
        setFormUser({ name: "" });
        setEditingId(null);
        setOpenForm(true);
    };

    const handleOpenEdit = (user: UserInterface) => {
        setFormUser({ ...user });
        setEditingId(user.id ?? null);
        setUser(user);
        setOpenForm(true);
    };

    const handleSave = async () => {
        if (!formUser.name || formUser.name.trim().length === 0) return;
        try {
            await startSavingUser({ id: editingId, user: formUser });
            setOpenForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenDelete = (user: UserInterface) => {
        setUser(user);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await startDeletingUser();
            setConfirmOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Bienvenido
                </Typography>
                <Typography>
                    Aplicación creada con React + TypeScript + Router y Material UI.
                </Typography>

                <br />

                <Typography variant="h5" gutterBottom>
                    Gestión de Usuarios
                </Typography>

                <Button variant="contained" color="primary" onClick={handleOpenCreate} sx={{ mb: 2 }}>
                    Nuevo Usuario
                </Button>

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((u: UserInterface) => (
                                <TableRow key={u.id}>
                                    <TableCell>{u.id}</TableCell>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>
                                        <Button size="small" variant="outlined" onClick={() => u.id ? navigate(`/posts/${u.id}`) : undefined} sx={{ mr: 1 }}>
                                            Ver Posts
                                        </Button>
                                        <IconButton size="small" onClick={() => handleOpenEdit(u)}><EditIcon /></IconButton>
                                        <IconButton size="small" onClick={() => handleOpenDelete(u)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {/* Form Dialog */}
                <Dialog open={openForm} onClose={() => setOpenForm(false)}>
                    <DialogTitle>{editingId ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nombre"
                            fullWidth
                            value={formUser.name}
                            onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenForm(false)}>Cancelar</Button>
                        <Button onClick={handleSave} variant="contained" disabled={isLocked}>
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Confirm Delete */}
                <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                    <DialogTitle>Confirmar eliminación</DialogTitle>
                    <DialogContent>
                        <Typography>¿Eliminar al usuario <strong>{disabledUser?.name}</strong>?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
                        <Button color="error" variant="contained" onClick={handleConfirmDelete} disabled={isLocked}>
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}
