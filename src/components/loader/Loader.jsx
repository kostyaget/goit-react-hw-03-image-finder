import { ThreeCircles } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

function Loader() {
    return (
        <LoaderWrapper>  
            <ThreeCircles 
                height={110}
                width={110}
                color="#f56217"
                ariaLabel='Loading'
            />
        </LoaderWrapper> 
    );
};
export default Loader;