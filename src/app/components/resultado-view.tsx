import { useState } from "react";
import { Jogador } from "../lib/jogador";

interface ResultadoViewProps {
    jogadores: Jogador[];
}
export default function ResultadoView({ jogadores }: ResultadoViewProps) {
    const sortedPlayers = [...jogadores].sort((a, b) => b.pegarPontos() - a.pegarPontos());
    return (
        <div>
            <div className="flex flex-col items-center justify-center w-full max-w-7xl ">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Ordem dos Jogadores</h2>
                    </div>


                    <div className="space-y-3 mt-2">
                        {sortedPlayers.map((player, index) => (
                        <div
                        key={player.Nome}
                        className="p-4 border rounded-xl flex justify-between items-center shadow-sm"
                        >
                            <span className="text-lg font-medium">{index + 1}. {player.Nome}</span>
                            <span className="text-lg font-bold">{player.pegarPontos()} pts</span>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}