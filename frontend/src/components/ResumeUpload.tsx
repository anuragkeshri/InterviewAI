import { useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, X, Loader2 } from "lucide-react";
import ResumeQuestionCard from "./ResumeQuestionCard";

type ResumeUploadProps = {
  onUpload: (file: File) => void;
};

export default function ResumeUpload({ onUpload }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [jobRole, setJobRole] = useState("Full Stack AI Developer");
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);

  const handleFile = (selected: File | undefined) => {
    if (!selected) return;

    if (
      selected.type !== "application/pdf" ||
      !selected.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a PDF file.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("Maximum file size is 5 MB.");
      return;
    }

    setError("");
    setUploadSuccess(false);
    setResumeId(null);
    setQuestions([]);
    setFile(selected);
    onUpload(selected);
    setSessionId(null);
  };

  const uploadResume = async () => {
    if (!file || uploading) return;

    setUploading(true);
    setError("");
    setUploadSuccess(false);
    setResumeId(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed");
      }

      setResumeId(data.resumeId);
      setUploadSuccess(true);

      console.log("Resume uploaded:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const generateQuestions = async () => {
    if (!resumeId || !jobRole.trim() || generating) return;

    setGenerating(true);
    setError("");
    setQuestions([]);
    setSessionId(null);

    try {
      const params = new URLSearchParams({
        resume_id: resumeId,
        job_role: jobRole.trim(),
      });

      const response = await fetch(
        `http://127.0.0.1:8000/resume/generate-questions?${params}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Question generation failed",
        );
      }

      const parsedQuestions = data.questions
        .split(/\n(?=\d+\.\s)/)
        .map((q: string) => q.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean);

     
// Create interview session
const sessionResponse = await fetch(
  "http://127.0.0.1:8000/sessions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobRole: jobRole.trim(),
      experience: "3-4 years",
      totalQuestions: parsedQuestions.length,
      averageScore: 0,
    }),
  }
);

if (!sessionResponse.ok) {
  throw new Error("Failed to create interview session");
}

const sessionData = await sessionResponse.json();

setSessionId(sessionData.sessionId);
setQuestions(parsedQuestions);

console.log("Session created:", sessionData.sessionId);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="w-full  rounded-2xl border border-white/10 bg-slate-900 p-6 text-white shadow-xl">
      <h2 className="text-xl font-semibold">Upload Your Resume</h2>
      <p className="mt-2 text-sm text-slate-400">
        Upload your PDF to generate personalized AI interview questions.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
        className="mt-6 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-indigo-500/40 bg-indigo-500/5 p-10 text-center transition hover:border-indigo-400 hover:bg-indigo-500/10"
      >
        <UploadCloud className="mb-4 h-12 w-12 text-indigo-400" />
        <p className="font-medium">Drag & drop your resume here</p>
        <p className="mt-2 text-sm text-slate-400">or click to browse files</p>
        <span className="mt-4 text-xs text-slate-500">
          PDF only · Maximum 5 MB
        </span>
      </div>

      {file && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <FileText className="text-indigo-400" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-xs text-slate-400">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <CheckCircle2 className="text-emerald-400" />
          <button
            type="button"
            aria-label="Remove file"
            onClick={() => {
              setFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      )}

      {/* <button
        type="button"
        onClick={uploadResume}
        disabled={!file || uploading}
        className="mt-5 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? "Processing Resume..." : "Upload & Analyze Resume"}
      </button> */}

      <button
        type="button"
        onClick={uploadResume}
        disabled={!file || uploading}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing Your Resume...
          </>
        ) : (
          <>
            <UploadCloud className="h-5 w-5" />
            Upload & Analyze Resume
          </>
        )}
      </button>

      {uploading && (
        <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
          <div className="mb-3 flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />

            <div>
              <p className="text-sm font-medium text-white">
                AI is processing your resume
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Extracting text, creating embeddings and saving to database...
              </p>
            </div>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-indigo-500" />
          </div>
        </div>
      )}

      {uploadSuccess && (
        <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
          <p className="font-semibold">Resume uploaded successfully!</p>
          <p className="mt-1 break-all text-xs">Resume ID: {resumeId}</p>
        </div>
      )}

      {uploadSuccess && resumeId && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Target Job Role
            </label>

            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g. Full Stack AI Developer"
              className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="button"
            onClick={generateQuestions}
            disabled={generating || !jobRole.trim()}
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {generating
              ? "Generating Questions..."
              : "Generate AI Interview Questions"}
          </button>
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Your Personalized Interview Questions
          </h3>

          {questions.length > 0 && (
            <div className="mt-8 space-y-5">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Your Personalized Interview Questions
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Practice answering questions based on your resume.
                </p>
              </div>

              {questions.map((question, index) => (
                <ResumeQuestionCard
                  key={`${resumeId}-${index}`}
                  question={question}
                  index={index}
                  jobRole={jobRole}
                  sessionId={sessionId}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
