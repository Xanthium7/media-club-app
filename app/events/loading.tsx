import { SpinningText } from "@/components/magicui/spinning-text";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <SpinningText className=" uppercase ">
        learn more • grow more • be more •
      </SpinningText>
    </div>
  );
}
