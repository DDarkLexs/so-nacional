import React from 'react';
import { Dialog, Button } from 'react-native-paper';

interface ConfirmDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  onDismiss,
  onConfirm,
}) => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Confirmar exclusão</Dialog.Title>
      <Dialog.Content>
        Tem certeza de que deseja excluir este endereço?
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancelar</Button>
        <Button onPress={onConfirm}>Confirmar</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ConfirmDialog;
