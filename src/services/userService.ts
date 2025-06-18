const API_URL = 'http://localhost:3000';

export const userService = {
  async getPrenom(): Promise<string | null> {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        return null;
      }

      const user = JSON.parse(userData);
      
      if (user.prenom) {
        return user.prenom;
      }

      const response = await fetch(`${API_URL}/users/${user.id_users}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return user.prenom || null;
        }
        throw new Error('Erreur de récupération des données utilisateur');
      }

      const data = await response.json();
      return data?.prenom || null;
    } catch (error) {
      console.error('Erreur:', error);
      return null;
    }
  }
};