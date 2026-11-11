import React from 'react';
import { Award, Printer, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  score: number;
  percentage: number;
  passed: boolean;
  dateStr: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  candidateName,
  score,
  percentage,
  passed,
  dateStr
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const certNumber = `HCIA-OG-${Math.abs((candidateName + dateStr).split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString(16).toUpperCase().padStart(8, '0')}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-4 sm:p-8 text-slate-900 border border-slate-200">
        {/* Modal Controls (Not printed) */}
        <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-red-600" />
            <span className="text-sm font-bold text-slate-800">
              Official HCIA-openGauss Certificate of Achievement
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Target of Print) */}
        <div 
          id="printable-certificate"
          className="relative bg-gradient-to-br from-amber-50/40 via-white to-slate-50 border-8 border-double border-red-800/80 p-8 sm:p-12 text-center rounded-xl shadow-inner overflow-hidden"
        >
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none text-red-950 font-black text-7xl sm:text-9xl rotate-[-25deg]">
            openGauss
          </div>

          {/* Top Brand Banner */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md ring-4 ring-red-100 mb-2">
              HCIA
            </div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-red-700">
              Huawei Certified ICT Associate
            </span>
            <div className="h-0.5 w-24 bg-red-600 mt-1"></div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-2">
            Certificate of Achievement
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
            This is to certify that
          </p>

          {/* Candidate Name */}
          <div className="border-b-2 border-red-700/40 inline-block px-10 pb-2 mb-4">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-red-900 capitalize">
              {candidateName || 'Candidate'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-6">
            has demonstrated foundational mastery in database architecture, high availability, SQL administration, storage engines, and security administration by passing the official CBT examination:
          </p>

          {/* Exam Title */}
          <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-3 max-w-md mx-auto mb-6">
            <div className="text-sm sm:text-base font-bold text-red-950">
              HCIA-openGauss (Exam Code: H13-911)
            </div>
            <div className="text-xs text-red-800 font-mono mt-0.5">
              Score: {score} / 1000 ({percentage}%) • Status: {passed ? 'PASSED (PASS MARK: 600)' : 'COMPLETED'}
            </div>
          </div>

          {/* Bottom Sign-off & Verification Code */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-4">
            <div className="text-left">
              <div className="font-semibold text-slate-800">Issue Date:</div>
              <div className="font-mono text-slate-500">{dateStr}</div>
            </div>

            {/* Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-100/70 border border-amber-300 rounded-full text-amber-900 text-[11px] font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Verified CBT Assessment</span>
            </div>

            <div className="text-right">
              <div className="font-semibold text-slate-800">Certificate ID:</div>
              <div className="font-mono text-slate-500 tracking-wider">{certNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
