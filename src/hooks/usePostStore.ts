import { useDispatch, useSelector } from "react-redux";

import { onLoadPosts, onSetPost, onSetLockedPost } from "../store";
import api from "../api/postApi";
import type { PostInterface } from "../models";

export const usePostStore = () => {

  const dispatch = useDispatch();

  const { isLoading, islocked, posts, disablePost } = useSelector(
    (state: any) => state.post
  );

  const setPost = (post: any) => {
    dispatch(onSetPost(post));
  };

  const setLocked = (valor: any) => {
    dispatch(onSetLockedPost(valor));
  };

  const startLoadingPosts = async (idUser: number) => {
    try {
      const { data } = await api.get(`/posts/byiduser/${idUser}`);
      const normalized = (data || []).map((p: any) => {
        if (p.iduser && !p.userId) {
          p.userId = p.iduser;
          delete p.iduser;
        }
        return p;
      });
      dispatch(onLoadPosts(normalized));
    } catch (error: any) {
      const backendMessage = error.response?.data?.backendMessage || "Error de conexión con el servidor.";
      console.log(backendMessage);
    }
  };

  const startLoadingPost = async (idPost: number) => {
    try {
      const { data } = await api.get(`/posts/${idPost}`);
      const p = data;
      if (p && p.iduser && !p.userId) {
        p.userId = p.iduser;
        delete p.iduser;
      }
      dispatch(onLoadPosts([p]));
      return p;
    } catch (error: any) {
      const backendMessage = error.response?.data?.backendMessage || "Error de conexión con el servidor.";
      console.log(backendMessage);
    }
  };



  const startSavingPost = async (post: {
    id: any;
    post: PostInterface;
  }) => {

    dispatch(onSetLockedPost(true));
    try {

      if (post.id) {
        // Actualizando
        const payload: any = { ...post.post };
        if (payload.userId && typeof payload.userId === "object") {
          payload.userId = payload.userId.id ?? payload.userId;
        }

        await api.put(`/posts/${post.id}`, payload);
        return;
      }
      // Creando
      await api.post("/posts", post.post);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(onSetLockedPost(false));
    }
  };

  const startDeletingPost = async (id: number) => {
    dispatch(onSetLockedPost(true));
    try {
      await api.delete(`/posts/${id}`);
    } catch (error: any) {
      const backendMessage = error.response?.data?.message || "Error de conexión con el servidor.";
      console.log(backendMessage);
    } finally {
      dispatch(onSetLockedPost(false));
    }
  };

  return {
    // properties
    posts,
    isLoading,
    islocked,
    disablePost,
    //metodos
    startLoadingPosts,
    startSavingPost,
    startDeletingPost,
    setPost,
    setLocked,
    startLoadingPost
  };
};