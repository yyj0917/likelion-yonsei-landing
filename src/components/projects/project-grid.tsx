"use client";

import { useState } from "react";
import Image from "next/image"; // Image 컴포넌트 추가
import { Github, ExternalLink, Trophy, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PROJECTS, type Project } from "@/data/projects";

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
      className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 bg-zinc-900 border border-white/5 hover:border-white/20"
    >
      {/* ✅ Thumbnail Image (Priority) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110`}
      >
        {project.thumbnail && (
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            className="object-cover opacity-100 group-hover:opacity-70 transition-opacity duration-500"
          />
        )}
        {/* 썸네일이 없을 때나 로딩 중에 보일 프로젝트 이름 */}
        {!project.thumbnail && (
          <div className="flex items-center justify-center h-full">
            <span className="text-white/20 text-4xl font-bold tracking-tighter uppercase italic">
              {project.name}
            </span>
          </div>
        )}
      </div>

      {/* Hover overlay - 디자인 통일감을 위해 더 깔끔하게 수정 */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-300 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-2 py-0.5 bg-yonsei-blue text-white text-[10px] font-bold rounded-md mb-3 uppercase">
            {project.generation}기 활동작
          </span>
          <h3 className="text-white text-2xl font-bold mb-2">{project.name}</h3>
          <p className="text-gray-300 text-sm line-clamp-2 break-keep">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}

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
      <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="hidden">
          <DialogTitle hidden></DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        {/* Header Section with Image */}
        <div className="relative h-64 w-full">
          <div className={`absolute inset-0 bg-gradient-to-br opacity-50`} />
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
          <div className="absolute bottom-6 left-8">
            <span className="px-2.5 py-1 bg-yonsei-blue text-white text-[10px] font-bold rounded-md mb-3 inline-block">
              {project.generation}기
            </span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
              {project.name}
            </h2>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <p className="text-gray-400 text-base leading-relaxed break-keep">
            {project.longDescription}
          </p>

          {/* Tech Stack - Tags style */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-white/5 border border-white/10 text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
            {/* Team Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-yonsei-light" />
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                  Build Team
                </h4>
              </div>
              <div className="space-y-2">
                {project.team.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-200 font-medium">
                      {member.name}
                    </span>
                    <span className="text-gray-500 text-xs">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Links */}
            <div className="space-y-6">
              {project.awards && project.awards.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-yellow-500" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                      Awards
                    </h4>
                  </div>
                  {project.awards.map((award) => (
                    <div
                      key={award}
                      className="text-sm text-yellow-500/90 font-medium italic"
                    >
                      {award}
                    </div>
                  ))}
                </div>
              )}

              {/* ✅ GitHub FE/BE 분리 및 배포 링크 섹션 */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  {project.githubUrl?.frontend && (
                    <a
                      href={project.githubUrl.frontend}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs hover:bg-white/10 transition-all"
                    >
                      <Github size={16} /> FE GitHub
                    </a>
                  )}
                  {project.githubUrl?.backend && (
                    <a
                      href={project.githubUrl.backend}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs hover:bg-white/10 transition-all"
                    >
                      <Github size={16} /> BE GitHub
                    </a>
                  )}
                </div>

                {project.deployUrl && (
                  <a
                    href={project.deployUrl}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yonsei-blue text-white text-sm font-bold hover:bg-blue-600 transition-all"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
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
          <span className="text-yonsei-light font-semibold text-sm tracking-widest uppercase">
            Project
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            프로젝트
          </h2>
          <p className="text-gray-400 text-base">
            멋쟁이사자처럼 연세대학교의 프로젝트를 소개합니다.
          </p>
        </div>

        {/* Project Grid - max 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
