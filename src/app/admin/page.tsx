"use client";

import { useEffect, useState } from "react";

import { Copy, Database, Terminal, User } from "lucide-react";
import axios from "axios";

export default function AdminPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [state, setState] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        setLoading(true);
        try {
            // Fetch directly from debug endpoint
            const res = await axios.get("http://localhost:8080/v1/debug/state");
            setState(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono p-8 selection:bg-green-900 selection:text-white">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex items-center justify-between border-b border-green-800 pb-6">
                    <div className="flex items-center gap-4">
                        <Terminal className="w-8 h-8" />
                        <h1 className="text-2xl font-bold tracking-widest uppercase">Proofa Backend :: System Monitor</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xs">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span>NODE: ONLINE (PORT 8080)</span>
                        </div>
                        <button
                            onClick={refresh}
                            className="px-4 py-2 border border-green-700 hover:bg-green-900/50 transition-colors text-xs uppercase"
                        >
                            Refresh Data
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* User Registry */}
                    <div className="border border-green-800 bg-black/50 p-6 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="w-5 h-5" />
                            <h2 className="text-xl font-bold uppercase">Registered Users</h2>
                            <span className="text-xs bg-green-900/30 px-2 py-1 rounded">
                                {state?.users ? Object.keys(state.users).length : 0}
                            </span>
                        </div>

                        {/* User Registry */}
                        {loading ? (
                            <div className="animate-pulse">Loading memory dump...</div>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {state?.users && Object.values(state.users).map((u: any) => (
                                    <div key={u.ID} className="bg-green-950/20 border border-green-900/50 p-4 rounded text-sm relative group hover:bg-green-900/10 transition-colors">
                                        <div className="flex flex-col gap-1 mb-2">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-white text-base">{u.FirstName} {u.LastName}</span>
                                                <span className="text-[10px] text-green-600 font-mono uppercase opacity-70">ID: {u.ID}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">{u.Email}</span>
                                        </div>
                                        <div className="grid gap-1.5 text-xs text-green-500/80 mt-3 pt-3 border-t border-green-900/30">
                                            <div className="flex gap-2 items-center">
                                                <span className="opacity-50 min-w-[70px] uppercase text-[10px]">Password:</span>
                                                <span className="font-mono text-white bg-red-900/20 px-1 rounded text-[10px] border border-red-900/30">
                                                    {u.Password || "********"}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <span className="opacity-50 min-w-[70px] uppercase text-[10px]">Role:</span>
                                                <span className="font-mono bg-green-900/30 px-1 rounded">CREATOR</span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <span className="opacity-50 min-w-[70px] uppercase text-[10px]">PQC Key:</span>
                                                <span className="font-mono truncate w-full text-[10px] bg-black/20 p-1 rounded">
                                                    {u.PqcPublicKey ? u.PqcPublicKey.substring(0, 24) + "..." : "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!state?.users || Object.keys(state.users).length === 0) && (
                                    <div className="text-green-800 italic text-center py-8">No users found in memory.</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Creative Seeds (Files) */}
                    <div className="border border-green-800 bg-black/50 p-6 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <Database className="w-5 h-5" />
                            <h2 className="text-xl font-bold uppercase">Files / Seeds</h2>
                            <span className="text-xs bg-green-900/30 px-2 py-1 rounded">
                                {state?.seeds ? Object.keys(state.seeds).length : 0}
                            </span>
                        </div>

                        {loading ? (
                            <div className="animate-pulse">Scanning registry...</div>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {state?.seeds && Object.values(state.seeds).map((s: any) => (
                                    <div key={s.ID} className="bg-green-950/20 border border-green-900/50 p-4 rounded text-sm hover:bg-green-900/10 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="bg-green-900/20 p-2 rounded w-full border border-green-900/30">
                                                <span className="font-mono text-green-400 text-xs block mb-1 opacity-50">CONTENT PREVIEW:</span>
                                                <p className="font-bold text-white line-clamp-2 text-xs font-mono">
                                                    {s.Content || "[BINARY FILE DATA]"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid gap-1 text-xs text-green-500/80 mt-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] uppercase opacity-50">SEED HASH:</span>
                                                <span className="font-mono">{s.ID.substring(0, 8)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] uppercase opacity-50">AUTHOR:</span>
                                                <span className="font-mono">{s.UserID.substring(0, 8)}...</span>
                                            </div>
                                            <div className="mt-2 p-1.5 bg-black/40 rounded border border-green-900/30 font-mono text-[9px] text-center text-green-700">
                                                vector_embedding status: indexed (1024 dim)
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!state?.seeds || Object.keys(state.seeds).length === 0) && (
                                    <div className="text-green-800 italic text-center py-8">Registry empty. No files uploaded.</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Evidence (Prompts) */}
                    <div className="border border-green-800 bg-black/50 p-6 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <Copy className="w-5 h-5" />
                            <h2 className="text-xl font-bold uppercase">Prompts & Scores</h2>
                            <span className="text-xs bg-green-900/30 px-2 py-1 rounded">
                                {state?.evidence ? Object.keys(state.evidence).length : 0}
                            </span>
                        </div>

                        {loading ? (
                            <div className="animate-pulse">Decrypting logs...</div>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {state?.evidence && Object.values(state.evidence).map((e: any) => (
                                    <div key={e.ID} className="bg-green-950/20 border border-green-900/50 p-4 rounded text-sm hover:bg-green-900/10 transition-colors group">
                                        <div className="mb-3">
                                            <span className="font-mono text-green-400 text-[10px] block mb-1 opacity-50">USER PROMPT:</span>
                                            <p className="font-medium text-white text-xs bg-black/30 p-2 rounded border border-green-900/20 group-hover:border-green-500/30 transition-colors">
                                                &quot;{e.Prompt}&quot;
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-green-900/30 pt-3 mt-3">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase opacity-50">HUMAN SCORE</span>
                                                <span className={`font-bold text-lg ${e.HumanScore >= 0.8 ? 'text-green-400' : 'text-yellow-600'}`}>
                                                    {(e.HumanScore * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <span className="text-[9px] uppercase opacity-50">PQC SIGNATURE</span>
                                                <span className="font-mono text-[9px] text-green-700 bg-green-950/30 px-1 rounded block max-w-[100px] truncate">
                                                    {e.PqcSignature || "PENDING"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!state?.evidence || Object.keys(state.evidence).length === 0) && (
                                    <div className="text-green-800 italic text-center py-8">No interaction evidence logged.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-green-900 pt-8 mt-8 text-center text-xs text-green-800 uppercase tracking-widest">
                    <p>Proofa Backend System &bull; Go Fiber v2 &bull; MockDB (In-Memory) &bull; Dilithium3 PQC</p>
                </div>
            </div>
        </div>
    );
}
