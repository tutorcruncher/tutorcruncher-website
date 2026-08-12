import { Content, isFilled, TableField } from "@prismicio/client";
import { PrismicTable, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import styles from "./table.module.scss";

/**
 * Props for `Table`.
 */
export type TableProps = SliceComponentProps<Content.TableSlice>;

/**
 * Component for "Table" Slices.
 */
const Table = ({ slice }: TableProps): JSX.Element | null => {
  // Slice Machine codegen types the Table field as `unknown`, so we cast to
  // the real TableField type here (survives type regeneration).
  const table = slice.primary.table as TableField;

  if (!isFilled.table(table)) return null;

  // This slice only appears inside blog articles, whose content column
  // already provides width and typography, so it renders without the
  // section-level Body wrapper and its large vertical padding.
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.wrapper}
    >
      <PrismicTable field={table} />
    </section>
  );
};

export default Table;
