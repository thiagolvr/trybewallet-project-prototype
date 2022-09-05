import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EDIT_EXPENSE,
  RELOAD_VALUES,
  REMOVE_EXPENSE,
} from '../helpers/constants';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  CloseButton,
  Stack,
} from '@chakra-ui/react'


function WalletTable() {
  const dispatch = useDispatch()
  const {expenses} = useSelector(({wallet}) => wallet)

  const handleClick = ({ target: { name } }, id, value) => {
    return name === 'delete'
      ? dispatch({ type: REMOVE_EXPENSE, payload: { id, value } })
          + dispatch({ type: RELOAD_VALUES })
      : dispatch({ type: EDIT_EXPENSE, payload: { id, value } })
          + dispatch({ type: RELOAD_VALUES });
  };

    return (
      <TableContainer className='table'>
      <Table variant='simple'>
        <TableCaption>Role para os lados para mais informações</TableCaption>
        <Thead>
          <Tr>
            <Th>Descrição</Th>
            <Th>Tag</Th>
            <Th>Método de pagamento</Th>
            <Th isNumeric>Valor</Th>
            <Th>Moeda</Th>
            <Th isNumeric>Câmbio utilizado</Th>
            <Th isNumeric>Valor convertido</Th>
            <Th>Moeda de conversão</Th>
            <Th>Editar/Excluir</Th>
          </Tr>
        </Thead>
        <Tbody>
        {expenses.map((expense) => {
              const { value } = expense;
              const { name, ask } = expense.exchangeRates[expense.currency];
              const sum = +ask * +value;

              return (
                <Tr key={ expense.id }>
                  <Td>{expense.description}</Td>
                  <Td>{expense.tag}</Td>
                  <Td>{expense.method}</Td>
                  <Td>{(+value).toFixed(2)}</Td>
                  <Td>{name}</Td>
                  <Td>{(+ask).toFixed(2)}</Td>
                  <Td>{sum.toFixed(2)}</Td>
                  <Td>Real</Td>
                  <Td>
                  <Stack direction='row' spacing={2} align='center'>
                    <Button
                     colorScheme='teal'
                      variant='ghost'
                      data-testid="edit-btn"
                      type="button"
                      name="edit"
                      onClick={ (e) => handleClick(e, expense.id) }
                    >
                      Editar
                    </Button>
                    <CloseButton
                      data-testid="delete-btn"
                      color='red'
                      type="button"
                      name="delete"
                      onClick={
                        (e) => handleClick(e, expense.id, +expense.value * ask)
                      }
                    />
                    </Stack>
                  </Td>
                </Tr>
              )
            })}
        </Tbody>
      </Table>
    </TableContainer>
    );
  }

export default WalletTable;
