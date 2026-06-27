import { LuUser } from "react-icons/lu";

function UserAvatar({ size = "md" }) {
  const dim = size === "sm" ? "w-6 h-6 text-sm" : "w-8 h-8 text-base";
  return (
    <div
      className={`bg-phthalo text-canvas-light rounded-full flex items-center justify-center flex-shrink-0 ${dim}`}
    >
      <LuUser />
    </div>
  );
}

export default UserAvatar;
