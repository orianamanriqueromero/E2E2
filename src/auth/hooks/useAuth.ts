import { useEffect, useMemo, useState } from 'react';
import { getToken } from '../../api';
import { getCurrentUser } from '../Services/authService';
import type { User } from '../types/auth';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(getToken());
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentToken = getToken();
    setToken(currentToken);

    if (!currentToken) {
      setUser(null);
      return;
    }

    getCurrentUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => setUser(null));
  }, []);

  return useMemo(() => ({ token, user }), [token, user]);
};
