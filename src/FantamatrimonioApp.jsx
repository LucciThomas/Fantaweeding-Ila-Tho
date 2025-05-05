// App Fantamatrimonio con tutte le funzioni tranne il pannello giudici
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDistanceToNowStrict } from "date-fns";

const GUESTS = [
  "ETHAN", "MAURO", "ROSI", "ALESSANDRA", "STEFANO",
  "ADELE", "MARCO", "LUCA", "GIULIA", "ANTONIO",
  "NADIA", "NICOLO'", "LISA", "LORENZO", "JACOPO",
  "ELISA", "FRANCESCA", "CHIARA", "EDOARDO", "LUDOVICA",
  "ROBERTO", "SAMUELE", "MASSIMO", "MIACAELA", "LOREDANA",
  "GAETANO", "MARCELLA", "PAOLO", "GIUSEPPE", "WALTER",
  "PATRIZIA", "DARIO", "VALERIA", "FRANCESA", "GIADA",
  "GIULIO", "GIADINA", "ALESSIA", "LAURA", "SALVATORE",
  "CRISTIANA", "ALESSIO", "PAOLA", "ANGELA", "FRANCO",
  "VALENTINA", "DIANA", "MIRKO", "IVAN", "STEFANIA",
  "FEDERICO", "MARTINA", "NICOLE", "RITA", "MARIO",
  "ROBERTA", "GIOVANNI", "VERONICA", "RICCARDO", "SILVIA",
  "RICCARDO T", "LUISA", "LUDOVICO", "GIOVANNA", "GABRIELE",
  "FEDERICA", "ALESSANDRO", "MARA", "SIMONE", "FABRIZIA"
];

const TEAM_SIZE = 5;

export default function FantamatrimonioApp() {
  const [countdown, setCountdown] = useState("");
  const [team, setTeam] = useState(Array(TEAM_SIZE).fill(""));
  const [teamName, setTeamName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [error, setError] = useState("");
  const [teamSaved, setTeamSaved] = useState(false);
  const [points, setPoints] = useState(0);
  const [log, setLog] = useState([]);
  const [showRanking, setShowRanking] = useState(false);
  const [ranking, setRanking] = useState([]);
  const [showSecretGoals, setShowSecretGoals] = useState(false);
  const weddingDate = new Date("2025-05-23T16:30:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = formatDistanceToNowStrict(weddingDate, { addSuffix: true });
      setCountdown(distance);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const undoLastAction = () => {
    const last = log[log.length - 1];
    if (!last) return;

    const match = last.match(/–\s(.+)\s\(\+(-?\d+)\)/);
    if (!match) return;

    const label = match[1];
    const pointsToRemove = parseInt(match[2], 10);

    const newLog = log.slice(0, -1);
    const newScore = points - pointsToRemove;

    setPoints(newScore);
    setLog(newLog);
    setToastMessage("↩️ Azione annullata!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    const savedTeam = JSON.parse(localStorage.getItem("fantamatrimonio_squadra")) || [];
    const teamName = localStorage.getItem("fantamatrimonio_nome_squadra") || savedTeam.join(" - ");
    const currentRanking = JSON.parse(localStorage.getItem("fantamatrimonio_classifica")) || [];
    const updatedRanking = [
      ...currentRanking.filter(t => t.name != teamName),
      { name: teamName, score: newScore }
    ];
    updatedRanking.sort((a, b) => b.score - a.score);
    localStorage.setItem("fantamatrimonio_classifica", JSON.stringify(updatedRanking));
    localStorage.setItem("fantamatrimonio_log", JSON.stringify(newLog));
    setRanking(updatedRanking);
  };

  // resto dell'interfaccia e funzioni...
}
