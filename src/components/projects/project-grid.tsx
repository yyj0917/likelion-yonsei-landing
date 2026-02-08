"use client";

import { useState } from "react";
import { Github, ExternalLink, Trophy, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PROJECTS, type Project } from "@/data/projects";

/** 프로젝트 카드 — gradient 배경 + hover 시 정보 오버레이 */
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative aspect-16/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:-translate-y-1"
    >
      {/* Thumbnail / Gradient Background */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${project.gradient} flex items-center justify-center`}
      >
        <span className="text-white/30 text-5xl font-bold tracking-wider select-none">
          {project.name}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/65 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">
        <span className="inline-block px-3 py-1 bg-likelion-orange text-white text-xs font-semibold rounded-full mb-3 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
          {project.generation}기
        </span>
        <h3 className="text-white text-lg font-bold mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {project.name}
        </h3>
        <p className="text-gray-300 text-sm translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          {project.description}
        </p>
      </div>
    </div>
  );
}

/** 프로젝트 상세 다이얼로그 — gradient 배너 + 팀원, 수상, 링크 정보 */
function ProjectDetailDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        {/* Header gradient banner */}
        <div
          className={`-mx-6 -mt-6 h-32 bg-linear-to-br ${project.gradient} flex items-end px-6 pb-4 rounded-t-lg`}
        >
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
              {project.generation}기
            </span>
          </div>
        </div>

        <DialogHeader className="pt-2">
          <DialogTitle className="text-2xl font-bold text-white">
            {project.name}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm leading-relaxed">
            {project.longDescription}
          </DialogDescription>
        </DialogHeader>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/10 text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Info sections */}
        <div className="space-y-5 pt-2">
          {/* Team */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-likelion-orange" />
              <h4 className="text-sm font-semibold text-white">팀원</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {project.team.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5"
                >
                  <span className="text-sm text-white">{member.name}</span>
                  <span className="text-xs text-gray-500">{member.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          {project.awards && project.awards.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={16} className="text-yellow-400" />
                <h4 className="text-sm font-semibold text-white">수상 경력</h4>
              </div>
              <div className="space-y-2">
                {project.awards.map((award) => (
                  <div
                    key={award}
                    className="px-3 py-2 rounded-lg bg-yellow-400/5 border border-yellow-400/10 text-sm text-yellow-200"
                  >
                    {award}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.githubUrl || project.deployUrl) && (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm text-white"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}
              {project.deployUrl && (
                <a
                  href={project.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-likelion-orange hover:bg-orange-600 transition-colors text-sm text-white"
                >
                  <ExternalLink size={16} />
                  배포 링크
                </a>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 프로젝트 그리드 (프로젝트 페이지)
 * - 최대 3열 반응형 그리드
 * - 카드 클릭 시 상세 다이얼로그 표시
 * @data PROJECTS (from @/data/projects) — 역대 기수 프로젝트 목록
 */
export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-likelion-orange font-semibold text-sm tracking-widest uppercase">
            Project
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            프로젝트
          </h2>
          <p className="text-gray-400 text-base">
            멋쟁이 사자처럼 연세대학교의 활동 프로젝트를 소개합니다.
          </p>
        </div>

        {/* Project Grid - max 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleCardClick(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <ProjectDetailDialog
        project={selectedProject}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
