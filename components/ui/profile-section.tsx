"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";


interface ProfileSectionProps {

  title: string;

  children: React.ReactNode;

  icon: React.ReactNode;

}


export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}