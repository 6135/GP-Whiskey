function CustomCell({ data }) {
	return (
		<div title={data} data-tag="allowRowEvents" style={{ maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{data}</div>
	)
}
export default CustomCell;