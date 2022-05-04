import { useNavigate, useParams } from 'react-router-dom';


export const routerMiddleware = (Component) => {
  const middleware = (props) => {
    const hookNavigator = useNavigate();
    const params = useParams();
    
    return (
      <Component
        navigate={hookNavigator}
        params={params}
        {...props}
        />
    );
  };
  
  return middleware;
};