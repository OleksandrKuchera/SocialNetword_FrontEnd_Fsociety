import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/system';


export interface Option {
  label: string;
  onClick: () => void;
}

// Определение типа для пропсов компонента
interface DropMenuProps {
  options: Option[]; // Указание типа массива объектов Option
}

const StyledMenu = styled(Menu)({
  background: 'rgba(0, 0, 0, 0.400)',
  transition: 'all 0.2s',

});
const StyledIconButton = styled(IconButton)`
  color: white;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.3);
    color: rgb(219,255,116);
  }
`;

export default function DropMenu({ options }: DropMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='d-flex justify-content-center'>
      <StyledIconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color='inherit'
      >
        <MoreVertIcon />
      </StyledIconButton>
      <StyledMenu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'long-menu',
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} onClick={(e: React.MouseEvent<HTMLLIElement>) => {
            e.stopPropagation(); // Зупиняємо вспливання події
            handleClose(); // Закриваємо меню при кліку на опцію
            option.onClick(); // Викликаємо функцію дії з об'єкта опції
          }}>
            {option.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
