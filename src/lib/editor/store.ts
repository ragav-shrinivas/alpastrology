"use client";

import { create } from "zustand";

export type Device = "desktop" | "tablet" | "mobile";

type EditorState = {
  isStaff: boolean;
  editing: boolean;
  device: Device;
  saving: number;
  setStaff: (v: boolean) => void;
  setEditing: (v: boolean) => void;
  toggleEditing: () => void;
  setDevice: (d: Device) => void;
  startSave: () => void;
  endSave: () => void;
};

export const useEditor = create<EditorState>((set) => ({
  isStaff: false,
  editing: false,
  device: "desktop",
  saving: 0,
  setStaff: (v) => set({ isStaff: v }),
  setEditing: (v) => set({ editing: v }),
  toggleEditing: () => set((s) => ({ editing: !s.editing })),
  setDevice: (d) => set({ device: d }),
  startSave: () => set((s) => ({ saving: s.saving + 1 })),
  endSave: () => set((s) => ({ saving: Math.max(0, s.saving - 1) })),
}));

export const DEVICE_WIDTH: Record<Device, number | null> = {
  desktop: null,
  tablet: 834,
  mobile: 390,
};
