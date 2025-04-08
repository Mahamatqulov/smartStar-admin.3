"use client";

import { useState } from "react";
import { Save, Upload, Plus } from "lucide-react";

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("general")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "general"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "email"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "security"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab("api")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "api"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              API
            </button>
          </nav>
        </div>

        <div className="p-6 h-[620px] overflow-y-auto">
          {activeTab === "general" && (
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    defaultValue="SmartStar"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site URL
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Description
                </label>
                <textarea
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  defaultValue="Admin panel for managing Kickstarter projects and users"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <select className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Standard Time (EST)</option>
                    <option value="CST">Central Standard Time (CST)</option>
                    <option value="MST">Mountain Standard Time (MST)</option>
                    <option value="PST">Pacific Standard Time (PST)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Format
                  </label>
                  <select className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Logo
                </label>
                <div className="flex items-center">
                  <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </button>
                  <span className="ml-4 text-sm text-gray-500">
                    No file selected
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Favicon
                </label>
                <div className="flex items-center">
                  <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Favicon
                  </button>
                  <span className="ml-4 text-sm text-gray-500">
                    No file selected
                  </span>
                </div>
              </div>

              <hr className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Featured Projects
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    defaultValue="5"
                    min="1"
                    max="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Projects Per Page
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    defaultValue="10"
                    min="10"
                    max="100"
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    className="mr-2"
                  />
                  <label
                    htmlFor="maintenanceMode"
                    className="text-sm text-gray-700"
                  >
                    Maintenance Mode
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </button>
              </div>
            </form>
          )}

          {activeTab === "email" && (
            <form>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Provider
                </label>
                <select className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="smtp">SMTP</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailgun">Mailgun</option>
                  <option value="ses">Amazon SES</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    defaultValue="Kickstarter Admin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Email
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    defaultValue="admin@example.com"
                  />
                </div>
              </div>

              <hr className="my-6" />
              <h3 className="text-lg font-medium mb-4">SMTP Settings</h3>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Encryption
                </label>
                <select className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="none">None</option>
                  <option value="ssl">SSL</option>
                  <option value="tls">TLS</option>
                </select>
              </div>

              <hr className="my-6" />
              <h3 className="text-lg font-medium mb-4">Email Templates</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Welcome Email Template
                </label>
                <textarea
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Approval Template
                </label>
                <textarea
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Settings
                </button>
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <form>
              <div className="mb-6">
                <div className="flex items-center">
                  <input type="checkbox" id="twoFactorAuth" className="mr-2" />
                  <label
                    htmlFor="twoFactorAuth"
                    className="text-sm text-gray-700"
                  >
                    Two-Factor Authentication
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password Expiry (days)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  defaultValue="90"
                  min="0"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  defaultValue="5"
                  min="1"
                  max="10"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  defaultValue="30"
                  min="5"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allowed IP Addresses (one per line)
                </label>
                <textarea
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  placeholder="Leave blank to allow all IPs"
                ></textarea>
              </div>

              <hr className="my-6" />
              <h3 className="text-lg font-medium mb-4">Password Policy</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Password Length
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="6"
                  max="20"
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requireUppercase"
                    className="mr-2"
                  />
                  <label
                    htmlFor="requireUppercase"
                    className="text-sm text-gray-700"
                  >
                    Require Uppercase
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <input type="checkbox" id="requireNumbers" className="mr-2" />
                  <label
                    htmlFor="requireNumbers"
                    className="text-sm text-gray-700"
                  >
                    Require Numbers
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requireSpecialChars"
                    className="mr-2"
                  />
                  <label
                    htmlFor="requireSpecialChars"
                    className="text-sm text-gray-700"
                  >
                    Require Special Characters
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </button>
              </div>
            </form>
          )}

          {activeTab === "api" && (
            <form>
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableApi"
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="enableApi" className="text-sm text-gray-700">
                    Enable API
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rate Limit (requests per minute)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  defaultValue="100"
                  min="10"
                  max="1000"
                />
              </div>

              <hr className="my-6" />
              <h3 className="text-lg font-medium mb-4">API Keys</h3>

              <div className="bg-gray-50 border rounded-md p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 font-medium text-sm text-gray-700 mb-2">
                  <div>Key Name</div>
                  <div>Created</div>
                  <div>Actions</div>
                </div>
                <hr className="my-2" />
                <div className="grid grid-cols-3 gap-4 text-sm py-2">
                  <div>Production API Key</div>
                  <div>2023-01-15</div>
                  <div>
                    <button className="px-2 py-1 text-xs text-red-600 border border-red-600 rounded hover:bg-red-50">
                      Revoke
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm py-2">
                  <div>Development API Key</div>
                  <div>2023-02-22</div>
                  <div>
                    <button className="px-2 py-1 text-xs text-red-600 border border-red-600 rounded hover:bg-red-50">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <button className="flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New API Key
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Webhook URL
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://example.com/webhook"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Webhook Events
                </label>
                <select
                  multiple
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  size={5}
                >
                  <option value="project.created">Project Created</option>
                  <option value="project.updated">Project Updated</option>
                  <option value="project.funded">Project Funded</option>
                  <option value="pledge.created">Pledge Created</option>
                  <option value="user.registered">User Registered</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Hold Ctrl (or Cmd) to select multiple events
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save API Settings
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
