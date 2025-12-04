import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import Contentstack from 'contentstack';


type PersonalizeContextType = {
  stack: any | null;
  loading: boolean;
  error: Error | null;
};

const PersonalizeContext = createContext<PersonalizeContextType>({
  stack: null,
  loading: true,
  error: null,
});

export const usePersonalizeContext = () => useContext(PersonalizeContext);

type PersonalizeProviderProps = {
  children: ReactNode;
  apiKey: string;
  deliveryToken: string;
  environment: string;
  // keep region prop for future, but optional
  region?: 'NA' | 'EU' | 'AZURE-NA' | 'AZURE-EU';
};

export const PersonalizeProvider: React.FC<PersonalizeProviderProps> = ({
  children,
  apiKey,
  deliveryToken,
  environment,
}) => {
  const [stack, setStack] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      console.log('Initializing Contentstack stack with:', {
        apiKey,
        deliveryToken,
        environment,
      });

      const csStack = Contentstack.Stack({
        api_key: apiKey,
        delivery_token: deliveryToken,
        environment,
        // no region for now – let SDK use default / host
      });

      setStack(csStack);
      setLoading(false);
    } catch (e: any) {
      console.error('Error initializing Contentstack stack', e);
      setError(e);
      setLoading(false);
    }
  }, [apiKey, deliveryToken, environment]);

  return (
    <PersonalizeContext.Provider value={{ stack, loading, error }}>
      {children}
    </PersonalizeContext.Provider>
  );
};
