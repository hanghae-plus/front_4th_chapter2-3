interface BadgeProps extends React.ComponentProps<"span"> {
  label: string;
  isSelected?: boolean;
}

export const Badge = ({ label, isSelected, ...props }: BadgeProps) => {
  return (
    <span
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        isSelected ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      {...props}
    >
      {label}
    </span>
  );
};
