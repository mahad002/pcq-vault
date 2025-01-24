"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}