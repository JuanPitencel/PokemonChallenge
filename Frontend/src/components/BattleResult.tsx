import { useMemo } from "react";
import { Box, Collapse, Alert } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { Pokemon } from '../types';

interface BattleResultProps {
  open: boolean;
  winner: Pokemon | null;
}

const BattleResult: React.FC<BattleResultProps> = ({ open, winner }) => {
  const notificationMessage = useMemo(() => {
    if (!winner) return "";
    return `${winner.name} wins!`;
  }, [winner]);

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Collapse in={open}>
        <Alert
          variant="filled"
          severity="info"
          sx={{ 
            backgroundColor: alpha('#a7ffeb', 0.3),
            color: 'black',
          }}
        >
          {notificationMessage}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default BattleResult;