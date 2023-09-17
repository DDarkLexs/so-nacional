import React from 'react';
import { DataTable, IconButton } from 'react-native-paper';
import { Endereco } from '../../model/endereco.model';

interface EnderecoTableProps {
  data: Endereco[];
  page: number;
  itemsPerPage: number;
  onNavigateToEdit: (item: Endereco) => void;
  onShowDialog: (item: Endereco) => void;
}

const EnderecoTable: React.FC<EnderecoTableProps> = ({
  data,
  page,
  itemsPerPage,
  onNavigateToEdit,
  onShowDialog,
}) => {
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>Morada</DataTable.Title>
        <DataTable.Title>Editar</DataTable.Title>
        <DataTable.Title>Eliminar</DataTable.Title>
      </DataTable.Header>

      {data.slice(from, to).map((item: Endereco) => (
        <DataTable.Row key={item.id_endereco}>
          <DataTable.Cell>{item.id_endereco}</DataTable.Cell>
          <DataTable.Cell>{item.morada}</DataTable.Cell>
          <DataTable.Cell>
            <IconButton icon="pencil" onPress={() => onNavigateToEdit(item)} />
          </DataTable.Cell>
          <DataTable.Cell>
            <IconButton icon="delete" onPress={() => onShowDialog(item)} />
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      {/* Paginação aqui */}
    </DataTable>
  );
};

export default EnderecoTable;
