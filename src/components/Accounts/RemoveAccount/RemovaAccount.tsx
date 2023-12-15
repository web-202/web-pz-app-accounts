import React from 'react';
import HttpAccounts from '../../../http/http-accounts';
import { Button } from 'react-bootstrap';

interface RemoveAccountButtonProps {
  accountId: number;
}

const RemoveAccountButton: React.FC<RemoveAccountButtonProps> = ({ accountId }) => {
  const handleRemoveAccount = async () => {
    try {
      await HttpAccounts.removeAccount(accountId);
      console.log('Account removed successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error removing account:', error);
    }
  };

  return (
    <Button className="remove-btn" onClick={handleRemoveAccount}>
        Delete
    </Button>
  );
};

export default RemoveAccountButton;