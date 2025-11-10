//PostSingle.tsx

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {Container,Typography,Box,Button,} from "@mui/material";

import { usePostStore } from "../hooks/usePostStore";

export default function SinglePost() {

    const { startLoadingPost, posts } = usePostStore();
    const { idpost } = useParams();
    const navigate = useNavigate();

    const fetchPost = async () => {
        if (!idpost) {
            return;
        }

        const id = Number(idpost);
        if (Number.isNaN(id)) {
            return;
        }

       await startLoadingPost(id);
    };

    useEffect(() => {
        if (idpost) fetchPost();
    }, [idpost]);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h5">
            Post por ID: {idpost}   
            </Typography>

            <br/>

            <Box sx={{ mb: 2 }}>
                <Button variant="outlined" onClick={() => navigate(-1)}>Regresar</Button>
            </Box>

            <Box id="posts-container" sx={{ mt: 2 }}>
                {posts && posts.length > 0 ? (
                    posts.map((p: any) => (
                        <Box key={p.id ?? Math.random()} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                            <Typography variant="h6">{p.title}</Typography>
                            <Typography variant="body2">{p.body}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2">No hay posts para mostrar</Typography>
                )}
            </Box>
        </Container>
    );
}