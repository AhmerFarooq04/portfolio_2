"use client";
import React from "react";
import proxmoxImage from "@/public/assets/proxmox.png";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function LabDisplay() {
  const cards = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  const router = useRouter();

  const navigate = () => {
    router.push("/");
  };

  return (
    <div className="w-full relative z-50">
      <Button
        onClick={() => navigate()}
        className="mx-3 bg-white dark:bg-white hover:bg-white/70"
      >
        <ArrowLeft className="text-zinc-700 dark:text-dark-1" />
      </Button>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "Infrastructure & Self-Hosting",
    title: "Proxmox Homelab",
    src: proxmoxImage,
    tags: ["Proxmox VE", "Linux", "Docker", "Tailscale", "GHCR", "systemd"],
    description:
      "A two-node Proxmox VE homelab for virtual machines, Linux containers, self-hosted applications, and secure remote access. It runs Docker workloads and an automatically updated portfolio, with a second node being converted into a worker for long-running Python, data science, and machine-learning jobs.",
    details: [
      {
        title: "Two nodes, one lab",
        text: "lab-main hosts the primary application workloads, including Docker and web hosting. lab-node2 is a Dell Latitude 7480 with an Intel Core i5-7200U, two cores, four threads, and 16 GB DDR4. Proxmox VE provides browser-based management of VMs, Linux containers, resource allocation, and virtual networking.",
      },
      {
        title: "Cluster setup & recovery",
        text: "Both machines were joined into lab-cluster. Work included establishing Corosync communication, verifying quorum and pmxcfs, regenerating certificates, and resolving communication issues until both nodes were healthy and visible. The two-node setup can lose quorum when one node is unavailable; a third-device quorum service is a future reliability improvement.",
      },
      {
        title: "Linux networking",
        text: "Configured predictable management addresses, hostnames, LAN connectivity, IPv4 forwarding, NAT masquerading, and firewall rules. Used ip, ping, ss, iw, and routing tables to diagnose connectivity and service ports, and compared Wi-Fi performance after moving devices to 5 GHz. Traced a repository validity error to incorrect host time.",
      },
      {
        title: "Private remote access",
        text: "Tailscale connects lab-main to a private Tailnet, with access verified from another network. Authenticated devices can reach SSH and the Proxmox web interface through an encrypted tunnel without exposing the management interface publicly or configuring router port forwarding.",
      },
      {
        title: "Containerized portfolio",
        text: "Docker and Docker Compose run the Next.js portfolio using standalone output and a production Dockerfile. A .dockerignore keeps unnecessary files out of the build context. Images are stored in GitHub Container Registry at ghcr.io/ahmerfarooq04/portfolio_2:latest. The local deployment returned HTTP 200 and the server reported ready; image cleanup and storage use were also considered.",
      },
      {
        title: "Automated updates",
        text: "portfolio-update.service pulls the latest image and recreates the application container. Its systemd timer was enabled, started, and verified with a successful service execution and journal logs. Updates use periodic polling; webhook or GitHub Actions deployment is a possible next improvement.",
      },
      {
        title: "Local AI experiment",
        text: "Open WebUI ran in Docker on Node 1 and connected to an Ollama API on Node 2. Qwen 2.5 7B models were installed and the API was tested successfully. CPU-only inference on the dual-core i5 was slow, so the experiment was retired: the models, Ollama service, account, and data were removed as the node transitions toward an ML execution worker.",
      },
      {
        title: "Domain & HTTPS plans",
        text: "A personal domain was purchased and is managed through Cloudflare. DNS routing, HTTPS, and potential Cloudflare Tunnel access are planned as the next phase after the healthy local deployment, with the aim of protecting the origin and avoiding direct exposure of the home IP.",
      },
      {
        title: "What comes next",
        text: "The next focus is unattended Python, data science, and machine-learning execution on Node 2. PostgreSQL, Airflow or Prefect orchestration, and trading automation remain planned workloads. The lab is an ongoing environment for learning infrastructure operations and deploying personal applications.",
      },
    ],
  },
];
