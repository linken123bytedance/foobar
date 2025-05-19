import { Button } from "ui";
import { fetchProfile, signOut, useAccountStore } from "../stores/account.ts";
import cx from "clsx";
import { use } from "react";

const profilePromise = fetchProfile();

export default function Profile() {
  const account = useAccountStore();
  const profile: any = use(profilePromise);

  return (
    <div
      className={cx(
        "max-w-full w-[1080px] min-h-screen",
        "text-wrap break-all",
        "mx-auto",
        "flex flex-col justify-center items-center",
        "gap-2",
      )}
    >
      <div
        className={cx("flex flex-col justify-center items-start", "w-[480px] py-2 px-4 rounded-md", "bg-neutral-50/5")}
      >
        <div className={cx("text-base")}> {profile.username}</div>
        <div className={cx("text-xs opacity-60", "-mt-1")}>username</div>
      </div>

      <Button
        className={["w-[120px]", "mt-8"]}
        key="sign_out"
        label="Sign Out"
        onClick={async () => {
          await signOut();
        }}
      />
    </div>
  );
}
