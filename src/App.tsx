import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'
import PostsTable from "./pages/Posts.tsx";
import SinglePost from "./pages/PostSingle.tsx";

function App() {
    return (
        <>
            <NavBar/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/posts/:iduser" element={<PostsTable/>}/>
                <Route path="/postsSingle/:idpost" element={<SinglePost/>}/>
            </Routes>
        </>
    )
}

export default App
