import { CURSOR_DIRECTIONS } from "../constants";
import React from "react";
import styled from "styled-components";

const CELL_WIDTH = 16;
const CELL_HEIGHT = 24;

const Grid = styled.View`
  position: relative;
  width: ${props => props.width * CELL_WIDTH}px;
  height: ${props => props.height * CELL_HEIGHT}px;
  margin: 32px 0;
`;

const Row = styled.View`
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: row;
  margin-left: ${props => props.start * (CELL_WIDTH - 1)}px;
`;

const Cell = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${CELL_WIDTH + 1}px;
  height: ${CELL_HEIGHT + 1}px;
  margin: 0 -1px -1px 0;
  border: 1px solid #000;

  background-color: ${props =>
    props.isWordFocused
      ? props.isColumn
        ? "#ffeb3b"
        : "#fff59d"
      : props.isColumn
      ? "#f2f2f2"
      : "#fff"};
`;

const CellContent = styled.Text``;

const RowNumber = styled.Text`
  position: absolute;
  top: 0px;
  left: 2px;

  font-size: 8px;
  color: #0009;
`;

const Cursor = styled.View`
  position: absolute;
  top: ${props => props.y * CELL_HEIGHT - 2}px;
  left: ${props => props.x * CELL_WIDTH - 2}px;
  z-index: 1;

  width: ${CELL_WIDTH + 5}px;
  height: ${CELL_HEIGHT + 5}px;
  border: 3px solid #2196f3;
`;

const PuzzleGrid = ({ grid, cursor, onCellPress }) => (
  <Grid width={grid.width} height={grid.height}>
    {grid.rows.map(row => (
      <Row key={row.y} start={row.startX}>
        {row.cells.map(cell => (
          <Cell
            key={cell.x}
            isColumn={cell.x === grid.columnX}
            isWordFocused={
              cursor &&
              (cursor.direction === CURSOR_DIRECTIONS.HORIZONTAL
                ? cursor.y === row.y
                : cursor.x === cell.x)
            }
            isFocused={
              cursor !== null && cursor.y === row.y && cursor.x === cell.x
            }
            onPress={event => {
              event.stopPropagation();
              onCellPress(cell.x, row.y);
            }}
          >
            <CellContent>{cell.value || ""}</CellContent>
          </Cell>
        ))}
        <RowNumber pointerEvents="none">{row.y + 1}</RowNumber>
      </Row>
    ))}
    {cursor && <Cursor x={cursor.x} y={cursor.y} pointerEvents="none" />}
  </Grid>
);

export default PuzzleGrid;
