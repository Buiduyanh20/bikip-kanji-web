"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettingsStore } from "@/store/settingsStore";

export function NameForm() {
  const savedName = useSettingsStore((state) => state.userName);
  const setName = useSettingsStore((state) => state.setUserName);
  const [name, setNameValue] = useState(savedName);
  const [saved, setSaved] = useState(false);
  return <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); setName(name); setSaved(true); }}><label htmlFor="user-name" className="text-sm font-semibold">Tên của bạn</label><Input id="user-name" value={name} maxLength={30} onChange={(event) => { setNameValue(event.target.value); setSaved(false); }} placeholder="Nhập tên..." className="h-11" /><Button type="submit" className="min-h-11">Lưu tên</Button>{saved ? <p className="text-sm text-success" role="status">Đã lưu tên.</p> : null}</form>;
}
