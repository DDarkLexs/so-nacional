import React from 'react';
import {Dialog, Button, Text, Portal} from 'react-native-paper';
import {Endereco} from '../../@types/model/endereco.model';

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
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Content>
          <Dialog.Icon size={50} icon={'alert'} />
          <Dialog.Title>Confirmar exclusão</Dialog.Title>
          <Text>Tem certeza de que deseja excluir este endereço?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button onPress={onConfirm}>Confirmar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmDialog;
