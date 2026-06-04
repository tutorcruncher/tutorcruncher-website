import { Content, isFilled, TableField } from "@prismicio/client";
import { PrismicTable, SliceComponentProps } from "@prismicio/react";
import type { JSX } from "react";

import { Body } from "@/components/ui/body";

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

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Body containerSize="small" spacing="small">
        <div className="main-content" style={{ overflowX: "auto" }}>
          <PrismicTable field={table} />
        </div>
      </Body>
    </section>
  );
};

export default Table;
