const API_URL = import.meta.env.VITE_API_URL; 

// export const register = async (members) => {
//   const response = await fetch(`${API_URL}members`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(members),
//   });
//   return response.json();
  
  
// };


export const login = async (email, password) => {
    const response = await fetch(`${API_URL}?email=${email}`);
    const members = await response.json();
  
    if (members.length > 0 && members[0].password === password) {
      localStorage.setItem("user", JSON.stringify(members[0]));
      return members[0];
    } else {
      throw new Error("登入失敗");
    }
  };
