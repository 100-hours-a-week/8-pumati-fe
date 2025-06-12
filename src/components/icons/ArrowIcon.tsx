export function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  const { fill = '#000000', ...rest } = props;
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      strokeWidth="3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12 21L12 3M12 3L20.5 11.5M12 3L3.5 11.5"
        stroke={fill}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
