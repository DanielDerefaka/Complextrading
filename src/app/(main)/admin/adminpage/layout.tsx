
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "@/components/sidebar";
import BlurPage from "@/components/global/blur-pagge";
import InfoBar from "@/components/global/InfoBar";
import SidebarAdmin from "@/components/sidebarAdmin";

type Props = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const layout = async ({ children, params }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }
  if (!agencyId) {
    return redirect("/agency");
  }

 

  let allNoti: any = [];
  const notification = await getNotificationAndUser(agencyId);
  if (notification) allNoti = notification;

  return (
    <div className="h-screen overflow-hidden">
      <SidebarAdmin id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">
        <InfoBar notification={allNoti} role={allNoti.User?.role} subAccountId={""} />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default layout;
