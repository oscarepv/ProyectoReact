import { Typography, Container } from '@mui/material'

export default function About() {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Acerca de
            </Typography>
            <Typography>
                Acerca de la aplicación.
            </Typography>
        </Container>
    )
}
