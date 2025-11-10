import { useDispatch, useSelector } from "react-redux";

import { onLoadUsers, onSetUser, onSetLockedUser, onAddNewUser, onUpdateUser, onDeleteUser } from "../store";
import api from "../api/postApi";
import type { UserInterface } from "../models";

export const useUserStore = () => {

  const dispatch = useDispatch();

  const { isLoading, isLocked, users, disabledUser } = useSelector(
    (state: any) => state.user
  );

  const setUser = (user : any) => {
    dispatch(onSetUser(user));
  };

  const setLocked = (valor: any) => {
    dispatch(onSetLockedUser(valor));
  };

  const startLoadingUsers = async () => {
    try {
      const { data } = await api.get("/users");
      console.log("Data fetched: ", data);
      dispatch(onLoadUsers(data));
    } catch (error: any) {
      const backendMessage = error.response?.data?.backendMessage || "Error de conexión con el servidor.";
      console.log(backendMessage);
    }           
  };


  const startSavingUser = async (user: {
    id: any;
    user: UserInterface;
  }) => {
    dispatch(onSetLockedUser(true));
    try {
      if (user.id) {
        // Actualizando
        const { data } = await api.put(`/users/${user.id}`, user.user);
        // actualizar en el store
        dispatch(onUpdateUser(data));
        return data;
      }
      // Creando
      const { data } = await api.post("/users", user.user);
      dispatch(onAddNewUser(data));
      return data;
    } catch (error: any) {
      console.log(error.response?.data || error.message || error);
      throw error;
    } finally {
      dispatch(onSetLockedUser(false));
    }
  };

  const startDeletingUser = async () => {
    dispatch(onSetLockedUser(true));
    try {
      if (!disabledUser) throw new Error('No user seleccionado para eliminar');
      await api.delete(`/users/${disabledUser.id}`);
      // eliminar del store
      dispatch(onDeleteUser());
    
    } catch (error: any) {
      const backendMessage = error.response?.data?.message || "Error de conexión con el servidor.";
        console.log(backendMessage);
    } finally {
      dispatch(onSetLockedUser(false));
    }
  };

  return {
    // properties
    users,
    isLoading,
    isLocked,
    disabledUser,
    //metodos
    startLoadingUsers,
    startSavingUser,
    startDeletingUser,
    setUser,
    setLocked
  };
};