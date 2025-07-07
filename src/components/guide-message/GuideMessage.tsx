type GuideMessageProps = {
  message: string;
};

export function GuideMessage({ message }: GuideMessageProps) {
  return (
    <div className="flex justify-center">
      <span className="text-xs text-grey hover:text-blue bg-blue-white rounded-md px-2 py-1 transition-colors duration-150">
        {message}
      </span>
    </div>
  );
}
