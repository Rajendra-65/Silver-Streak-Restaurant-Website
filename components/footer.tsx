"use client"

import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Silver Streak</h3>
            <p className="text-neutral-400">Premium authentic Chinese cuisine Restaurant</p>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              Location
            </h4>
            <p className="text-neutral-400">
              BMC BHAWANI MALL , BLOCK-1 , 3rd Floor
              <br />
              Saheed Nagar , Odisha , 751007
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-neutral-400">
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-yellow-400" />
                07978635184
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-yellow-400" />
                hello@silverstreak.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">© 2025 Silver Streak. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-yellow-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-yellow-400 transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
