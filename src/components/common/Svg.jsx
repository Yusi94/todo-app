import styles from '../../styles/Svg.css';

function SVG({
  width,
  height,
  viewBox,
  path,
  fill,
  stroke,
  strokeWidth,
  strokeLinecap,
  fillRule,
  clipRule,
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg">
      <path
        className="path"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        fillRule={fillRule}
        clipRule={clipRule}
        d={path} />
    </svg>
  );
}

export default SVG;
