import React, { useEffect, useState } from "react";
import Router from "./Router/Router";
import { GlobalContext } from "./contexts/GlobalContext";
import axios from "axios";
//Para consumir um API:
//Criar o estado [useState]
//Criar o efeito colateral [useEffect]
//Função de requisição
//Lista sempre em plural

function App() {
  const [users, setUsers] = useState([]);
  const[selected, setSelected] = useState("");

  const fetchAllUsers = async () => {
    try {
      const response = await axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
          { 
            headers: { 
              Authorization: "edipo-mascari-ammalb" 
            }
          }
      )
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    fetchAllUsers()
  }, []);

  const context = {
    users,
    selected,
    setSelected
  };
  
  return (
    <>
      <GlobalContext.Provider value={context}>
        <Router />
      </GlobalContext.Provider>
    </>
  );
}

export default App;