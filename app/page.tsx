'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase, Project } from '@/lib/supabase';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .limit(4);

      if (error) throw error;
      setFeaturedProjects(data || []);
    } catch (error) {
      console.error('Error fetching featured projects: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (featuredProjects.length === 0) return;

    const cards = document.querySelectorAll('.card');
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('in-view'), i * 80);
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((c) => obs.observe(c));

    return () => obs.disconnect();
  }, [featuredProjects]);

  return (
    <main className="pt-24 flex-grow">
      <div className="px-4 md:px-10 lg:px-20 mx-auto max-w-7xl">
        {/* Hero */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                TonyBase
              </h1>
              <p className="text-lg md:text-xl text-subtext-light dark:text-subtext-dark max-w-3xl mx-auto md:mx-0 mb-4">
              A website to keep up with the whereabouts of Anthony Raemsch
              </p>

              <div className="flex justify-center md:justify-start gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-transparent text-black px-5 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black tracking-tight">Featured Projects</h3>
            <Link href="/projects" className="text-sm text-black font-medium hover:text-vibrant-accent transition-colors flex items-center gap-1">
              See all projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border-2 border-black rounded-xl p-5 space-y-3 animate-pulse">
                  <div className="bg-gray-300 h-6 w-16 rounded-full"></div>
                  <div className="bg-gray-300 h-12 rounded"></div>
                  <div className="flex gap-1.5">
                    <div className="bg-gray-300 h-6 w-16 rounded"></div>
                    <div className="bg-gray-300 h-6 w-16 rounded"></div>
                    <div className="bg-gray-300 h-6 w-16 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="py-10 text-gray-600">
              No featured projects yet. Add some in the admin panel!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="card group block bg-white border-2 border-black rounded-xl overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-1 hover:shadow-xl opacity-0"
                  style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards` }}
                >
                  {/* Project Image */}
                  {project.image_url && (
                    <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                      {project.image_url.startsWith('data:') ? (
                        // Base64 images use regular img tag
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        // External URLs use Next.js Image
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    {/* Day Badge */}
                    {project.day_number && (
                      <div className="inline-block">
                        <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                          Day {project.day_number}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h4 className="text-lg font-black tracking-tight text-black leading-tight group-hover:text-vibrant-accent transition-colors min-h-[3rem]">
                      {project.title}
                    </h4>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech_stack.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs border border-black bg-transparent text-black px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* View Arrow */}
                    <div className="flex items-center text-xs text-black font-medium pt-1 group-hover:text-vibrant-accent transition-colors">
                      View Project
                      <svg
                        className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
