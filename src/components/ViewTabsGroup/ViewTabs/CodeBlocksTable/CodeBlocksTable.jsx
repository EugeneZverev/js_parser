import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import useTableStyles from './CodeBlocksTableStyles'

const CodeBlocksTableHead = () => {
    const headCells = [
        { id: 'componentType', label: 'Component type' },
        { id: 'name', label: 'Name' },
        { id: 'signature', label: 'Signature' },
    ]

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell key={headCell.id} align='center' padding='none'>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const CodeBlocksTable = props => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const rows = props.components.map(component => ({
        componentType: component.type,
        name: component.name,
        signature: `(${component.signature.join(', ')})`,
    }))

    const tableClasses = useTableStyles()

    const handleChangePage = (event, newPage) => setPage(newPage)
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const isSelected = name => props.selected === name

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    return (
        <Paper className={tableClasses.paper}>
            <TableContainer>
                <Table
                    className={tableClasses.table}
                    aria-labelledby="tableTitle"
                    size='medium'
                    aria-label="enhanced table"
                >
                    <CodeBlocksTableHead classes={tableClasses} />
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={() => props.handleRowClick(row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell align="left">{row.componentType}</TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">{row.name}</TableCell>
                                        <TableCell align="left">{row.signature}</TableCell>
                                    </TableRow>
                                )
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default CodeBlocksTable