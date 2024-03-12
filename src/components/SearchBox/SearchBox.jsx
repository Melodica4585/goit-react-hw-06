import { useId } from "react";
import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { changefilter, selectNameFilter } from '../../redux/filtersSlice';

export const SearchBox = () => {
  const inputId = useId();
  const dispatch = useDispatch();

  const reduxInputFilter = useSelector(selectNameFilter);

  return (
    <div className={css.search}>
      <label htmlFor="{inputId}">Find contacts by name</label>
      <input
        className={css.input}
        id={inputId}
        type="text"
        value={reduxInputFilter}
        onChange={evt => {
          dispatch(changefilter(evt.target.value));
        }}
      />
    </div>
  );
}

export default SearchBox;