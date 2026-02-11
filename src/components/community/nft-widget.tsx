"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Sparkles, Coins } from "lucide-react";

interface NFTWidgetProps {
    onMintChange: (checked: boolean) => void;
    onCoinAmountChange: (amount: number) => void;
}

export function NFTWidget({ onMintChange, onCoinAmountChange }: NFTWidgetProps) {
    const [mintEnabled, setMintEnabled] = React.useState(false);

    return (
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 text-purple-600">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                        <Label htmlFor="mint-nft" className="font-bold text-gray-900 dark:text-white">Mint as NFT</Label>
                        <p className="text-xs text-gray-500">Create a unique digital asset from this post.</p>
                    </div>
                </div>
                <Switch
                    id="mint-nft"
                    checked={mintEnabled}
                    onCheckedChange={(checked) => {
                        setMintEnabled(checked);
                        onMintChange(checked);
                    }}
                />
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-white/5">
                <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600">
                    <Coins className="w-4 h-4" />
                </div>
                <div className="flex-1">
                    <Label htmlFor="coin-amount" className="font-bold text-gray-900 dark:text-white mb-1 block">Attach Coins</Label>
                    <div className="relative">
                        <Input
                            id="coin-amount"
                            type="number"
                            placeholder="0.00"
                            className="pl-8 bg-white dark:bg-[#111]"
                            onChange={(e) => onCoinAmountChange(parseFloat(e.target.value) || 0)}
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
