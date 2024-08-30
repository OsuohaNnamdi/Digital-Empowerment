import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import logoImage from './logos.jpeg';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img
        src={logoImage}
        alt="Logo"
        style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
      />
    </LinkStyled>
  );
};

export default Logo;
