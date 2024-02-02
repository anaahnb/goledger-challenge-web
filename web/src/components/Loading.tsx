import ReactLoading from 'react-loading';

type LoadingType = 'blank' | 'balls' | 'bars' | 'bubbles' | 'cubes' | 'cylon' | 'spin' | 'spinningBubbles' | 'spokes';

interface LoadingProps {
  type: LoadingType; 
  color: string; 
}

export default function Loading({ type, color }: LoadingProps) {
  return (
    <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
  );
}
