import * as React from 'react';
import {DataTable, Text, useTheme} from 'react-native-paper';
import MinhaEncomendaDT from '../../components/Menu/MinhaEncomendaDT.component';
import {EncomendaController} from '../../controller/Encomenda/encomenda.controller';
import {showToast} from '../../service/toast.service';
import {
  useAppDispatch,
  useAppSelector,
} from '../../@types/redux/hook/index.hook';
import {setEncomendas} from '../../store/reducer/encomenda.reducer';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {Encomendas} from '../../@types/model/encomenda.model';

const MinhaEncomendaDataTable: React.FC<any> = ({
  navigation,
  procurar,
}): React.JSX.Element => {
  const [page, setPage] = React.useState<number>(0);
  const [data, setData] = React.useState<Encomendas[]>([]);
  const [numberOfItemsPerPageList] = React.useState([2, 5, 10]);
  const encomendas = useAppSelector(state => state.encomenda.encomendas);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[1],
  );
  const ctrl = new EncomendaController();

  const fetchData = async () => {
    try {
      await ctrl.getAllByIdUser();
      setData(ctrl.encomenda);
      dispatch(setEncomendas(ctrl.encomenda));
    } catch (error) {
      showToast({
        text1: 'Houve erro!',
        text2: `${JSON.stringify(error)}`,
        position: 'bottom',
        type: 'error',
      });
    }
  };

  const getData = async () => {
    try {
      if (!!procurar) {
        const filtered = data.filter(item => {
          const objectValues = Object.values(item).join('').toLowerCase();
          return objectValues.includes(procurar.toLowerCase());
        });
        dispatch(setEncomendas(filtered));
      } else {
        dispatch(setEncomendas(data));
        fetchData();
      }
      //   dispatch(setEncomendas(ctrl.encomenda));
    } catch (error) {
      showToast({
        text1: 'Houve erro!',
        text2: `${JSON.stringify(error)}`,
        position: 'bottom',
        type: 'error',
      });
    }
  };

  React.useEffect(() => {
    getData();
  }, [procurar]);
  React.useEffect(() => {
    //   console.log(navigation)
    fetchData();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, encomendas.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable >
      <DataTable.Header>
        <DataTable.Title>#</DataTable.Title>
        <DataTable.Title>Total</DataTable.Title>
        <DataTable.Title>Estado</DataTable.Title>
        <DataTable.Title numeric>Menu</DataTable.Title>
      </DataTable.Header>

      {encomendas.slice(from, to).map(item => (
        <DataTable.Row key={item.id_compra}>
          <DataTable.Cell>
            {item.id_compra /* JSON.stringify(!!procurar) */}
          </DataTable.Cell>
          <DataTable.Cell>
            <Text variant="bodySmall">{convertToCurrency(item.total)}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text variant="bodySmall">{item.estado}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <MinhaEncomendaDT navigation={navigation} encomenda={item} />
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(encomendas.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} de ${encomendas.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        dropdownItemRippleColor={'white'}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Coluna por página'}
      />
    </DataTable>
  );
};

export default MinhaEncomendaDataTable;
